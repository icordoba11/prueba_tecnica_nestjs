import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : 'Internal server error';

        this.logger.error('Exception caught', exception instanceof Error ? exception.stack : '');

        response.status(status).json({
            statusCode: status,
            message: typeof message === 'object' && message !== null && 'message' in message
                ? (message as { message: string }).message
                : message,
            error: exception instanceof Error ? exception.name : 'UnknownError',
        });
    }
}

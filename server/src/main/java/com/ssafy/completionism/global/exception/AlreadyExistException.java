package com.ssafy.completionism.global.exception;

import org.springframework.http.HttpStatus;

public class AlreadyExistException extends ServiceRuntimeException {
    public AlreadyExistException(String resultCode, HttpStatus httpStatus, String resultMessage) {
        super(resultCode, httpStatus, resultMessage);
    }

    public String getResultCode() { return super.getResultCode(); }

    public HttpStatus getHttpStatus() { return super.getHttpStatus(); }

    public String getResultMessage() { return super.getResultMessage(); }
}

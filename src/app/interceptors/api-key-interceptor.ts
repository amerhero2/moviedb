import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable()
export class APIKeyInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const request = req.clone({
            params: req.params.set('api_key', 'c8cf90b3c1a02ebf6f1161de9455d673')
        });
        return next.handle(request);
    }
}
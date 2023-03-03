export class MiddlewareChain {
    /**
     * @private
     * @param middlewares
     */
    constructor(middlewares = []) {
        this.middlewares = middlewares;
    }

    static async new(middlewares = []) {
        return new MiddlewareChain(middlewares);
    }

    handleRequest(request, response) {
        let currentHandlerIndex = -1;
        const next = () => {
            currentHandlerIndex++;
            if (currentHandlerIndex >= this.middlewares.length) {
                this.sendResponse(response, 404, 'Not Found');
                return;
            }
            this.middlewares[currentHandlerIndex].handleRequest(request, response, next.bind(this));
        };
        next();
    }

    sendResponse(response, status, message) {
        response.writeHead(status, {'Content-Type': 'text/plain'});
        response.end(message);
    }
}
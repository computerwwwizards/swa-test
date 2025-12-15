import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function render(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { 
        body: `<html><body><h1>Hello from API, ${name}!</h1></body></html>`,
        headers: {
            'Content-Type': 'text/html'
        }
    };
};

app.http('render', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: render
});

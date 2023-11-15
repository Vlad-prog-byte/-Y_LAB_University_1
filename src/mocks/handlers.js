import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.post('/auth', async ({ request }) => {
    const { email, password } = await request.json(); 
    if (email === "vlad@gmail.com" && password === "123456")
        return HttpResponse.json({
            status: "ok"
        });
    else
        return HttpResponse.json({
            status: "error"
        });
  })
]
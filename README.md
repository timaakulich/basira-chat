## Getting Started
0. Backend must implement two endpoints
```
POST: "/api/v1/messages/"
{
    "message": "text"
}

POST: "/api/v1/suggestions/"
{}
```
1. Create `.env` file and add backend url to it
```bash
BACKEND_URL=http://some-url
```


```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


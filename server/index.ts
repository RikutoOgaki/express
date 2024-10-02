import express, { Application, Request, Response } from "express";
import cors from 'cors';
import { uid } from 'uid';

const app: Application = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req: Request, res: Response) => {
//     console.log("getリクエストを受け付けました。");
//     return res.status(200).json({ message: "hello world" });
// });

app.get('/', (req: Request, res: Response) => {
    console.log('getリクエストを受け付けました。');

    const todos = [
        { id: 1, todo: 'test1' },
        { id: 2, todo: 'test2' },
        { id: 3, todo: 'test3' },
        { id: 4, todo: 'test4' }
    ];

    return res.status(200).json({ todos });
});

app.post('/add', (req: Request, res: Response) => {
    console.log('postリクエストを受け取りました');
    console.log(req.body.data.todo);
    const { todo } = req.body.data;
    const uidValue = uid();
    return res.status(200).json({ id: uidValue, todo });
});

app.delete('/delete', (req: Request, res: Response) => {
    console.log('deleteリクエストを受け取りました');
    console.log(req.body.id);
    return res.status(200).json({ message: 'success' });
});

app.put('/update', (req: Request, res: Response) => {
    console.log('putリクエストを受けとりました');
    console.log(req.body.data);
    const { id, todo } = req.body.data;
    return res.status(200).json({ id, todo });
})



try {
    app.listen(PORT, () => {
        console.log(`server running at://localhost${PORT}`);
    });
}
catch (e) {
    if (e instanceof Error) {
        console.error(e.message);
    }
}
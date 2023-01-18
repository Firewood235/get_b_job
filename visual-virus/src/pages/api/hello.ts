// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  ){
    const mysql = request('mysql');
    console.log('mysql req');
    const con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'visual_virus',
    });
    console.log('DB接続済み');

    //クエリログ書き出し
    const query = `SELECT * FROM username`;
    con.connect((err: any) => {
      if (err) throw err;
      console.log('接続完了');

      con.query(query, (err: any, results: any, fields: any) => {
        if (err) throw err;
        console.log(results);
        console.log(fields);
      });
    });
    res.status(200);
    res.end();
  }




  //   res.status(200).json({ name: 'John Doe' })
// }


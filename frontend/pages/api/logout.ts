import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, headers } = req;

  if (method !== "POST") {
    res.status(404).end();
  }

  try {
    console.log("before logout (headers?.cookies)", headers?.cookies);
    const { data, headers: returnedHeaders } = await axios.post(
      "http://localhost:8080/dev/logout",
      undefined,
      {
        headers,
      }
    );
    console.log("after logout (headers?.cookies)", headers?.cookies);
    Object.keys(returnedHeaders).forEach((key) =>
      res.setHeader(key, returnedHeaders[key])
    );
    res.status(200).json(data);
  } catch (e) {
    const { response } = e;
    const { status, data } = response;
    console.log("response (response)");
    res.status(status).json(data);
  }
};

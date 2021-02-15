// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
const app = new express();

const courses = [
  { id: 4, name: "Java程序设计", createTime: "2046-05-10T12:00" },
  { id: 5, name: "Web开发技术", createTime: "2046-04-10T09:00" },
  { id: 6, name: "Web系统框架", createTime: "2046-06-10T21:30" },
  { id: 7, name: "移动终端开发技术", createTime: "2046-06-13T18:43" }
];

app.get("/api/courses/:cid", function(req, res) {
  const cid = req.params.cid;
  const course = courses.find(c => c.id == req.params.cid);
  res.header("role", "admin");

  res.send({
    code: 200,
    data: {
      course: course
    }
  });
});

app.listen("3000", "localhost");

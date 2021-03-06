var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
  return `
    <!doctype html>
    <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${body}
      </body>
    </html>
  `;
}

function templateList(filelist){
  var list = '<ul>';
  for(var i = 0;i < filelist.length; i++){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
  }
  list = list + '</ul>';
  return list;
}
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templateList(filelist);  
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
  
          response.writeHead(200);
          response.end(template);
        });
      }else{
        fs.readdir('./data', function(error, filelist){
          fs.readFile(`data/${queryData.id}`, function(err, description){
            var title = queryData.id;
            var list = templateList(filelist); 
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
      
            response.writeHead(200);
            response.end(template);
          });
        });
      };
    }else{ // 404 에러
      var errPage = `
        <!doctype html>
        <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1>페이지를 찾을 수 없습니다.</h1>
            <ul>
              <li><a href="/">메인으로 돌아가기</a></li>
              <li><a href="/?id=HTML">HTML페이지 바로가기</a></li>
              <li><a href="/?id=CSS">CSS페이지 바로가기</a></li>
              <li><a href="/?id=JAVASCRIPT">JAVASCRIPT페이지 바로가기</a></li>
            </ul>
          </body>
        </html>
      `;
      response.writeHead(404);
      response.end(errPage);
    }
    
    
    
 
});
app.listen(3000);
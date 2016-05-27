var http = require('http');
var url = require('url');
var fs = require('fs');
var mime_types = 
{
  'a'      : 'application/octet-stream',
  'ai'     : 'application/postscript',
  'aif'    : 'audio/x-aiff',
  'aifc'   : 'audio/x-aiff',
  'aiff'   : 'audio/x-aiff',
  'au'     : 'audio/basic',
  'avi'    : 'video/x-msvideo',
  'bat'    : 'text/plain',
  'bin'    : 'application/octet-stream',
  'bmp'    : 'image/x-ms-bmp',
  'c'      : 'text/plain',
  'cdf'    : 'application/x-cdf',
  'csh'    : 'application/x-csh',
  'css'    : 'text/css',
  'dll'    : 'application/octet-stream',
  'doc'    : 'application/msword',
  'dot'    : 'application/msword',
  'dvi'    : 'application/x-dvi',
  'eml'    : 'message/rfc822',
  'eps'    : 'application/postscript',
  'etx'    : 'text/x-setext',
  'exe'    : 'application/octet-stream',
  'gif'    : 'image/gif',
  'gtar'   : 'application/x-gtar',
  'h'      : 'text/plain',
  'hdf'    : 'application/x-hdf',
  'htm'    : 'text/html',
  'html'   : 'text/html',
  'jpe'    : 'image/jpeg',
  'jpeg'   : 'image/jpeg',
  'jpg'    : 'image/jpeg',
  'js'     : 'application/x-javascript',
  'ksh'    : 'text/plain',
  'latex'  : 'application/x-latex',
  'm1v'    : 'video/mpeg',
  'man'    : 'application/x-troff-man',
  'me'     : 'application/x-troff-me',
  'mht'    : 'message/rfc822',
  'mhtml'  : 'message/rfc822',
  'mif'    : 'application/x-mif',
  'mov'    : 'video/quicktime',
  'movie'  : 'video/x-sgi-movie',
  'mp2'    : 'audio/mpeg',
  'mp3'    : 'audio/mpeg',
  'mp4'    : 'video/mp4',
  'mpa'    : 'video/mpeg',
  'mpe'    : 'video/mpeg', 
  'mpeg'   : 'video/mpeg',
  'mpg'    : 'video/mpeg',
  'ms'     : 'application/x-troff-ms',
  'nc'     : 'application/x-netcdf',
  'nws'    : 'message/rfc822',
  'o'      : 'application/octet-stream',
  'obj'    : 'application/octet-stream',
  'oda'    : 'application/oda',
  'pbm'    : 'image/x-portable-bitmap',
  'pdf'    : 'application/pdf',
  'pfx'    : 'application/x-pkcs12',
  'pgm'    : 'image/x-portable-graymap',
  'png'    : 'image/png',
  'pnm'    : 'image/x-portable-anymap',
  'pot'    : 'application/vnd.ms-powerpoint',
  'ppa'    : 'application/vnd.ms-powerpoint',
  'ppm'    : 'image/x-portable-pixmap',
  'pps'    : 'application/vnd.ms-powerpoint',
  'ppt'    : 'application/vnd.ms-powerpoint',
  'pptx'    : 'application/vnd.ms-powerpoint',
  'ps'     : 'application/postscript',
  'pwz'    : 'application/vnd.ms-powerpoint',
  'py'     : 'text/x-python',
  'pyc'    : 'application/x-python-code',
  'pyo'    : 'application/x-python-code',
  'qt'     : 'video/quicktime',
  'ra'     : 'audio/x-pn-realaudio',
  'ram'    : 'application/x-pn-realaudio',
  'ras'    : 'image/x-cmu-raster',
  'rdf'    : 'application/xml',
  'rgb'    : 'image/x-rgb',
  'roff'   : 'application/x-troff',
  'rtx'    : 'text/richtext',
  'sgm'    : 'text/x-sgml',
  'sgml'   : 'text/x-sgml',
  'sh'     : 'application/x-sh',
  'shar'   : 'application/x-shar',
  'snd'    : 'audio/basic',
  'so'     : 'application/octet-stream',
  'src'    : 'application/x-wais-source',
  'swf'    : 'application/x-shockwave-flash',
  't'      : 'application/x-troff',
  'tar'    : 'application/x-tar',
  'tcl'    : 'application/x-tcl',
  'tex'    : 'application/x-tex',
  'texi'   : 'application/x-texinfo',
  'texinfo': 'application/x-texinfo',
  'tif'    : 'image/tiff',
  'tiff'   : 'image/tiff',
  'tr'     : 'application/x-troff',
  'tsv'    : 'text/tab-separated-values',
  'txt'    : 'text/plain',
  'ustar'  : 'application/x-ustar',
  'vcf'    : 'text/x-vcard',
  'wav'    : 'audio/x-wav',
  'wiz'    : 'application/msword',
  'wsdl'   : 'application/xml',
  'xbm'    : 'image/x-xbitmap',
  'xlb'    : 'application/vnd.ms-excel',
  'xls'    : 'application/vnd.ms-excel',
  'xlsx'    : 'application/vnd.ms-excel',
  'xml'    : 'text/xml',
  'xpdl'   : 'application/xml',
  'xpm'    : 'image/x-xpixmap',
  'xsl'    : 'application/xml',
  'xwd'    : 'image/x-xwindowdump',
  'zip'    : 'application/zip'
}
// Crea el servidor Web, que será atendido por la funcion fnServer
var server = http.createServer( fnServer );

// funcion que atiende las peticiones
function fnServer(req, res){
	console.log( "Peticion recibida" + req.url );
 if( req.url == "/undefined" ){
    req.url = "/principal.html";
  }
  else
	if( req.url == "/Login"){  // Verificar usuario y contraseña
		ValidateUser( req, res );
	} 
	else if( req.url == "/producto" ){
		grabarUsuario( req, res );
	}
  else if( req.url == "/publicacion" ){
    grabarPublicacion( req, res );
  }
  else if( req.url == "/PublicacionesDeIdeas" ){
    var str = JSON.stringify(  JSON.parse( fs.readFileSync('publicaciones.json','utf8') ) );
    res.end( str );
  }
  else if( req.url == "/Usuarios" ){
    var str = JSON.stringify(  JSON.parse( fs.readFileSync('producto.json','utf8') ) );
    res.end( str );
  }
  else{
		paginaPorDefecto( req, res );
	}
}

 
  function grabarUsuario( req, res ){
    console.log( req.content );
    // el evento data se ejecuta cuando este completo el content del request
    req.on( 'data', function (content ){

    		var mensajeNuevo = JSON.parse(content);
  		var chat = JSON.parse(fs.readFileSync('producto.json'));
  		chat.push(mensajeNuevo);
  		console.log(chat+'');
  		fs.writeFile('producto.json', JSON.stringify(chat), null );
    } );
  	
  }

function grabarPublicacion( req, res ){
    console.log( req.content );
    // el evento data se ejecuta cuando este completo el content del request
    req.on( 'data', function (content ){

        var mensajeNuevo = JSON.parse(content);
      var chat = JSON.parse(fs.readFileSync('publicaciones.json'));
      chat.push(mensajeNuevo);
      console.log(chat+'');
      fs.writeFile('publicaciones.json', JSON.stringify(chat), null );
    } );
    
  }

  

  // Verifica usuario y contraseña enviados en JSON
  function ValidateUser( req, res ){
    var usuarios = JSON.parse( fs.readFileSync('users.json','utf8') );
  
  req.on( 'data', function(data) {
    // Deserializa en la variable datos el cuerpo de la peticion HTTP
    var datos = JSON.parse( data );
    console.log( datos );
    
    var clavereal = usuarios[ datos.user ];
    var usuarioReal = usuarios[ datos.user ];

    if( datos.pwd == clavereal){
      // Si tiene la clave correcta
      res.writeHead( 200, {"Set-Cookie":"login=yes"})
      res.end("Bienvenido");
    } else {
      // Se equivoco
      res.writeHead( 402, {"Set-Cookie":"login=no"})
      res.end("No autorizado");
    }
  }
  );
  }

function paginaPorDefecto(req, res){
	  // cambie el archivo hola.html por el el desea mostrar		
var ruta = 'contenido/';
 //  var path_nombre = (url.parse(peticion.url).pathname == '/') ? '/Login.html' : url.parse(peticion.url).pathname;
      var path_nombre = url.parse(req.url).pathname;
      
      //console.log(path_nombre);
             if(path_nombre == '/'){
             path_nombre = 'Login.html';
            }
         var ruta_a_archivo =  ruta + path_nombre;
         fs.exists(ruta_a_archivo, function(existe){
            if(existe){
               fs.readFile(ruta_a_archivo, function(error, contenido_archivo){
                  if(error){
                     res.writeHead(500, 'text/plain');
                     res.end('Error interno.');
                  }else{
                     var extension = ruta_a_archivo.split('.').pop();
                     var mime_type = mime_types[extension];

        //             console.log(extension + " ----- " + ruta_a_archivo);

                     res.writeHead(200, {'Content-Type': mime_type});
                     res.end(contenido_archivo);
                  }
               });
            }else{
               res.writeHead(404, 'text/plain');
               res.end('Error 404. El enlace no existe o ha dejado de existir.');
            }
         });
      }
console.log('El servidor esta funcionando correctamente en http://localhost:3000/');



console.log( "Servidor HTTP corriendo. Ctrl-c para terminar")
// Ejecuta el servidor
server.listen(process.argv[2] || 8080 );

  
			  
			  
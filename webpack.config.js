// import
const path = require('path');  // NodeJS 전역 모듈, 별도 설치없이 사용 가능
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// export
module.exports = {  
  mode: "production",    
  // entry: './src/js/main.js',       // 파일을 읽어들이기 시작하는 진입점 설정  
  entry: {
    main: './src/js/main.js',         // 메인 페이지 엔트리 포인트
    about: './src/js/about.js',       // 서브 페이지 엔트리 포인트
    product: './src/js/product.js'    // 또 다른 서브 페이지 엔트리 포인트
  },
  output: {                           // 결과물(번들)을 반환하는 설정
    // 'path'와 'filename' 이 두 옵션을 설정하지 않으면 기본값인 'dist' 폴더로 지정되어 Output이 되게 됩니다. 
    path: path.resolve(__dirname, 'dist'),  // 번들링 결과물을 반환하는 경로 설정
    filename: '[name].js',           // 번들링 결과물의 파일 이름 설정
    clean: true                      // 기존의 내용인 남지 않도록 삭제하고 새로 번들된 내용이 만들어지도록 'clean' 옵션 사용 
  },

  // 플러그인 관련 설정
  plugins: [
    // HtmlWebpackPlugin 플러그인 설정
    // - 템플릿 파일을 읽어들여 번들된 파일을 출력하는 플러그인
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main']            // main.js와 연결
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/about.html',
      filename: 'pages/about.html',
      chunks: ['about']           // about.js와 연결
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/product.html',
      filename: 'pages/product.html',
      chunks: ['product']         // product.js와 연결
    }),

    // CopyPlugin 플러그인 설정
    // - 파일을 복사하는 플러그인
    new CopyPlugin({
      patterns: [{ from: 'static' }]  // 복사할 파일 경로 설정
    }),
  ],

  // 모듈 관련 설정
  module: {
    rules: [
      {
        test: /\.s?css$/,  // 정규표현식으로 '.scss'와 '.css'로 끝나는 문자를 찾습니다.

        // 주의 아래 사용하는 순서를 지키는게 중요합니다! 
        use: [
          'style-loader',     // js파일에서 해석된 css의 내용을 html문서에 삽입해 주는 용도의 패키지
          'css-loader',       // js파일에서 css파일을 해석할 수 있도록 해주는 용도의 패키지
          'postcss-loader',   // 브라우저 호환성을 위한 패키지
          'sass-loader',      // js파일에서 scss파일을 해석할 수 있도록 해주는 용도의 패키지
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  // 개발 서버 관련 설정
  devServer: {
    // static: {
    //   directory: path.resolve(__dirname, 'dist'),
    // },
    host: '127.0.0.1',      // 도메인 설정
    port: 8080,             // 포트 설정
    open: true,             // 개발 서버 실행 시 자동으로 브라우저 열기
  },
};
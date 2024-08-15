<#macro emailLayout>
<html  lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IN-CORE</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header img {
            width: 150px;
        }
        .content {
            margin: 20px 0;
        }
        .content h1 {
            font-size: 24px;
            color: #333333;
        }
        .content p {
            text-align: justify;
            font-size: 16px;
            color: #666666;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 14px;
            color: #999999;
        }
        .footer a {
            color: #0066cc;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://incore.ncsa.illinois.edu/public/resilience-logo.png" alt="IN-CORE Logo">
        </div>
        <div class="content">
            <#nested>
        </div>
        <div class="footer">
            <p>Questions regarding your account? Contact us at <a href="mailto:incore-dev@lists.illinois.edu">incore-dev@lists.illinois.edu</a>.</p>
        </div>
    </div>
    
</body>
</html>
</#macro>

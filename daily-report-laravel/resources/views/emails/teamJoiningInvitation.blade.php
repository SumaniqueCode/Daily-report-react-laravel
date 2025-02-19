<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        button{
            background: #4CAF50;
            border: 1px solid rgb(22, 115, 246);
            border-radius: 3px;
            padding-left:10px;
            padding-right: 10px;
            padding-top:3px;
            padding-bottom: 3px;
            text-align: center;
        }
    </style>
</head>
<body>
    <p>Hello {{ $user->name }},</p>
    
    <p>You have been invited to join a team from Daily-Report App.</p>
        <p>Please click the link below to join the team.</p>
        <a href="http://localhost:8000/api/accept-team-invitation/{{$id}}" style="background: #4CAF50; border-radius: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px; padding-bottom: 5px; text-align: center; display: inline-block; text-decoration: none; color: #fff; transition: background 0.3s;">Accept Team Invitation</a>
        <p>Thank you!</p>
        </body>
</html>

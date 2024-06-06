<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body>
    <p>Hello {{ $user->name }},</p>
    
    <p>You have requested to reset your password. Please use the following token to complete the reset process:</p>

    <p>Reset Token: {{ $token }}</p>

    <p>If you didn't request a password reset, please ignore this email.</p>

    <p>Thank you!</p>
</body>
</html>

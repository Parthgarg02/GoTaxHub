<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$service = isset($_POST['service']) ? trim($_POST['service']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

// Prepare email content
$to = 'info@gotaxhub.com';
$subject = 'New Contact Form Submission - GoTaxHub';

$email_content = "New contact form submission from GoTaxHub website:\n\n";
$email_content .= "Name: " . $name . "\n";
$email_content .= "Email: " . $email . "\n";
$email_content .= "Phone: " . $phone . "\n";
$email_content .= "Service Required: " . ($service ? $service : 'Not specified') . "\n";
$email_content .= "Message: " . ($message ? $message : 'None provided') . "\n\n";
$email_content .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";

// Email headers
$headers = array(
    'From: noreply@gotaxhub.com',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
);

// Send email
if (mail($to, $subject, $email_content, implode("\r\n", $headers))) {
    echo json_encode(['success' => true, 'message' => 'Thank you for your message. We will get back to you within 24 hours.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly.']);
}
?>
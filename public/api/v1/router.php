<?php
/**
 * Forwards /api/v1/* on this host to the subscription API.
 * Used when Apache serves this folder directly (no root RewriteRule).
 */

$path = isset($_GET["__path"]) ? (string) $_GET["__path"] : "";
$path = ltrim($path, "/");
$path = rtrim($path, "/");

if ($path === "" || strpos($path, "..") !== false || !preg_match("#^[A-Za-z0-9_./-]+$#", $path)) {
    http_response_code(400);
    header("Content-Type: application/json");
    echo json_encode(["success" => false, "message" => "Invalid API path"]);
    exit;
}

$query = [];
foreach ($_GET as $key => $value) {
    if ($key === "__path") {
        continue;
    }
    $query[$key] = $value;
}

$url = "https://subscriptionapi.primesourcellp.com/api/v1/" . $path . "/";
$qs = http_build_query($query);
if ($qs !== "") {
    $url .= "?" . $qs;
}

$method = isset($_SERVER["REQUEST_METHOD"]) ? $_SERVER["REQUEST_METHOD"] : "GET";
$body = file_get_contents("php://input");

$headers = ["Accept: application/json"];
if (!empty($_SERVER["CONTENT_TYPE"])) {
    $headers[] = "Content-Type: " . $_SERVER["CONTENT_TYPE"];
}

$ch = curl_init($url);
$options = [
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER => true,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_FOLLOWLOCATION => true,
];
if ($body !== false && $body !== "" && $method !== "GET" && $method !== "HEAD") {
    $options[CURLOPT_POSTFIELDS] = $body;
}
curl_setopt_array($ch, $options);

$response = curl_exec($ch);
if ($response === false) {
    http_response_code(502);
    header("Content-Type: application/json");
    echo json_encode(["success" => false, "message" => "Subscription API unavailable"]);
    curl_close($ch);
    exit;
}

$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
curl_close($ch);

http_response_code($status ? $status : 502);
$rawHeaders = substr($response, 0, $headerSize);
foreach (preg_split("/\r\n|\n|\r/", $rawHeaders) as $line) {
    if (stripos($line, "Content-Type:") === 0) {
        header($line);
    }
}
echo substr($response, $headerSize);

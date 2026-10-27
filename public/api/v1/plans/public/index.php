<?php
/**
 * Direct hit for GET /api/v1/plans/public/
 * Survives hosts that do not apply RewriteRules under /api/.
 */
$_GET["__path"] = "plans/public";
require dirname(__DIR__, 2) . "/router.php";

<?php

$folder = $_GET['folder'];

$files_list = array_slice(scandir("../$folder" ), 3);
echo json_encode( $files_list );
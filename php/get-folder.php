<?php

$folder = $_GET['folder'];

$files_list = array_slice(scandir("../$folder" ), 2);
echo json_encode( $files_list );
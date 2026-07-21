<?php
// Адрес целевого сайта
$target_url = 'https://dufax.net';

// Инициализация cURL запроса
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $target_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

// Выполняем запрос к dufax.net
$html = curl_exec($ch);
curl_close($ch);

if ($html === false) {
    die('Ошибка загрузки целевого сайта.');
}

// Заменяем относительные ссылки на абсолютные, чтобы работали стили и картинки
$html = preg_replace('/href="\/([^"]+)"/', 'href="' . $target_url . '/$1"', $html);
$html = preg_replace('/src="\/([^"]+)"/', 'src="' . $target_url . '/$1"', $html);

// Отправляем чистый HTML браузеру пользователя
echo $html;
?>

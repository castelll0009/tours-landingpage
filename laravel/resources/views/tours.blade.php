<!DOCTYPE html>
<html>
<head>
    <title>Listado de Tours</title>
</head>
<body>
    <h1>Listado de Tours</h1>
    <ul>
        @foreach ($tours as $tour)
            <li>
                {{ $tour->title }} - {{ $tour->description }} - ${{ $tour->price }}
            </li>
        @endforeach
    </ul>
</body>
</html>

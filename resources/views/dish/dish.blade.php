<!DOCTPE html>
<html>
<head>
<title>Dish</title>
</head>
<body>
<a href="/create_new_dish">Create New Dish</a>

@if(\Session::has('suceess'))
<div class="alert alert-danger">
<h4>{{\Session::get('success')}}</h4>
</div>
@endif

<table>
<tr>
<td>Dish Name</td>
<td>Price</td>
<td>Action</td>
</tr>
@foreach ($dish as $dish)
<tr>
<td>{{ $dish->dish_name }}</td>
<td>{{ $dish->price }}</td>
<td><a href="/delete_dish/{{ $dish->dish_id }}">Delete</a>
<a href="/update_dish_page/{{ $dish->dish_id }}">Update</a></td>
</tr>
@endforeach
</table>
</body>
</html>
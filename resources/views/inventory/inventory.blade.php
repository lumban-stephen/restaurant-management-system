<!DOCTPE html>
<html>
<head>
<title>Inventory</title>
</head>
<body>
<a href="/create_inventory">Add New Inventory</a>

@if(\Session::has('suceess'))
<div class="alert alert-danger">
<h4>{{\Session::get('success')}}</h4>
</div>
@endif

<table>
<tr>
<td>Food Name</td>
<td>Quantity</td>
<td>Unit</td>
<td>Restocked Date</td>
<td>Expiry Date</td>
<td>Dish Name</td>
<td>Restock</td>
<td>Action</td>
</tr>
@foreach ($inventory as $inventory)
<tr>
<td>{{ $inventory->food_name }}</td>
<td>{{ $inventory->quantity }}</td>
<td>{{ $inventory->unit }}</td>
<td>{{ $inventory->restocked_date }}</td>
<td>{{ $inventory->expiry_date }}</td>
<td>{{ $inventory->dish_name }}</td>
<td>
<form action="/restock_inventory/{{ $inventory->inventory_id }}" method="POST" enctype="multipart/form-data">
@csrf
<input type="number" class="form-control" id ="qty" name="qty">
<input type="date" class="form-control" id ="eday" name="eday">
<input type="hidden" id="name" name="name" value="{{ $inventory->dish_name }}">
<input type="hidden" id="unit" name="unit" value="{{ $inventory->unit }}">
<input type="hidden" id="psize" name="psize" value="{{ $inventory->portion_size }}">
<input type="hidden" id="dish" name="dish" value="{{ $inventory->dish_id }}">
<button class="btn btn-primary" type="submit">Submit</button>
</td>


<td><a href="/delete_inventory/{{ $inventory->inventory_id }}">Delete</a>
<a href="/update_inventory_page/{{ $inventory->inventory_id }}">Update</a></td>
</tr>
@endforeach
</table>
</body>
</html>
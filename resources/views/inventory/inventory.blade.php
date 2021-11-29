<!DOCTPE html>
<html>
<head>
<title>Inventory</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.datatables.net/1.11.3/css/dataTables.bootstrap.min.css"> 
<<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link id="link" rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

</head>
<body>
<a href="/create_inventory">Add New Inventory</a>

@if(\Session::has('suceess'))
<div class="alert alert-danger">
<h4>{{\Session::get('success')}}</h4>
</div>
@endif

<table id="GFGtable">
<tr>
<td>Food Name</td>
<td>Quantity</td>
<td>Unit</td>
<td>Expiry Date</td>
<td>Restocked Date</td>
<td>Status</td>
<td>Buttons</td>
</tr>
@foreach ($inventory as $inventory)
<tr>
<td class="gfgusername">{{ $inventory->food_name }}</td>
<td class="gfgpp">{{ $inventory->quantity }}</td>
<td class="gfgscores">{{ $inventory->unit }}</td>
<td class="gfgarticles">{{ $inventory->expiry_date }}</td>
<td>{{ $inventory->restocked_date }}</td>
<td>@if ($inventory->expiry_date < $today)
    Expired
@elseif ($inventory->expiry_date == $today)
    Consume
@else
    Good
@endif</td>



<td><a href="/delete_inventory/{{ $inventory->inventory_id }}">Delete</a>
<button class="gfgselect bg-secondary" data-toggle="modal" data-target="#gfgmodal">
SELECT</button>
</td>
</tr>
@endforeach
</table>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Create New Inventory
</button>

<!-- Start Add Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form action="/add_new_inventory" method="POST" enctype="multipart/form-data" id="editForm">
    @csrf

    <div class="form-group">
        <br><label for="name"><strong>Food Name:</strong></label>
        <input type="text" class="form-control" id ="name" name="name">
        </div>
        <div class="form-group">
        <label for="qty"><strong>Quantity:</strong></label>
        <input type="number" class="form-control" id ="qty" name="qty">
        
        <div class="form-group">
        <label for="unit"><strong>Unit:</strong></label>
        <select name="unit" id="unit">
            <option value="ml">ml</option>
            <option value="g">g</option>
            <option value="pcs">pcs</option>
        </select>

        <br>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
        </form>
      </div>
    </div>
  </div>
</div>
<!-- End Add Modal -->

<!-- Start Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="form-group">
        <br><label for="name"><strong>Food Name:</strong></label>
        <input type="text" class="form-control" id ="name" name="name">
        </div>
        <div class="form-group">
        <label for="qty"><strong>Quantity:</strong></label>
        <input type="number" class="form-control" id ="qty" name="qty">
        
        <div class="form-group">
        <label for="unit"><strong>Unit:</strong></label>
        <select name="unit" id="unit">
            <option value="ml">ml</option>
            <option value="g">g</option>
        </select>
        
        <div class="form-group">
        <label for="eday"><strong>Expiry Date:</strong></label>
        <input type="date" class="form-control" id ="eday" name="eday">        
        </div>


        <br>
        
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
        </form>
      </div>
      </div>
    </div>
  </div>
</div>
<!-- End Edit Modal -->


<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>


</body>
</html>
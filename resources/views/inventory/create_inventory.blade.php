<div class="container">
<a href="/inventory">Back</a>

<form action="/add_new_inventory" method="POST" enctype="multipart/form-data">
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
        <button class="btn btn-primary" type="submit">Submit</button>
        </form>
</div>

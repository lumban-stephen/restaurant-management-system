<div class="container">
<a href="/inventory">Back</a>

<form action="/update_inventory/{{ $inventory[0]->inventory_id }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="form-group">
        <br><label for="name"><strong>Food Name:</strong></label>
        <input type="text" class="form-control" id ="name" name="name" value="{{$inventory[0]->food_name}}">
        </div>
        <div class="form-group">
        <label for="qty"><strong>Quantity:</strong></label>
        <input type="number" class="form-control" id ="qty" name="qty" value="{{$inventory[0]->quantity}}">
        
        <div class="form-group">
        <label for="unit"><strong>Unit:</strong></label>
        <select name="unit" id="unit" value="{{$inventory[0]->unit}}">
            <option value="ml">ml</option>
            <option value="g">g</option>
        </select>

        <div class="form-group">
        <label for="psize"><strong>Portion Size:</strong></label>
        <input type="number" class="form-control" id ="psize" name="psize" value="{{$inventory[0]->portion_size}}">
        
        <div class="form-group">
        <label for="eday"><strong>Expiry Date:</strong></label>
        <input type="date" class="form-control" id ="eday" name="eday" value="{{$inventory[0]->expiry_date}}">        
        </div>

        <div class="form-group">
        <label for="dish"><strong>Dish:</strong></label>
        <select name="dish" id="dish" value="{{$inventory[0]->dish_id}}">
            @foreach ($dish as $dish)
            <option value="{{ $dish->dish_id }}">{{ $dish->dish_name }}</option>
            @endforeach
        </select>

        <br>
        <button class="btn btn-primary" type="submit">Submit</button>
        </form>
</div>


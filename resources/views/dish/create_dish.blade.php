<div class="container">
<a href="/dish">Back</a>

<form action="/add_new_dish" method="POST" enctype="multipart/form-data">
    @csrf

    <div class="form-group">
        <br><label for="name"><strong>Dish Name:</strong></label>
        <input type="text" class="form-control" id ="name" name="name">
        </div>
        <div class="form-group">
        <label for="price"><strong>Price:</strong></label>
        <input type="number" class="form-control" id ="price" name="price">
        
        
        <div class="form-group">
        <label for="ingredient"><strong>Ingredients:</strong></label>
            @foreach ($inventory as $inventory)
            @if (empty($inventory->dish_id))
            <br>
            <input type="checkbox" id="food" name="food[]" value="{{ $inventory->dish_id }}">
            <input type="hidden" id="inventory" name="inventory[]" value="{{ $inventory->inventory_id }}">
            <label for="food">{{ $inventory->food_name }}</label>
            @endif
            @endforeach
    </div>
        <button class="btn btn-primary" type="submit">Submit</button>
        </form>
</div>
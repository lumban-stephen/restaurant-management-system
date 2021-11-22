<div class="container">
<a href="/dish">Back</a>

<form action="/update_dish/{{ $dish[0]->dish_id }}" method="POST" enctype="multipart/form-data">
    @csrf

    <div class="form-group">
        <br><label for="name"><strong>Dish Name:</strong></label>
        <input type="text" class="form-control" id ="name" value="{{$dish[0]->dish_name}}" name="name">
        </div>
        <div class="form-group">
        <label for="email"><strong>Price:</strong></label>
        <input type="number" class="form-control" id ="price" value="{{$dish[0]->price}}" name="price">    
    </div>
        <button class="btn btn-primary" type="submit">Submit</button>
        </form>
</div>
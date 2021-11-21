<div class="container">
<form action="/update_profile" method="POST" enctype="multipart/form-data">
    @csrf
    
    <div class="form-group">
        <label for="picture"><strong>Picture:</strong></label>
        <img src="/image/{{ $user->file_path }}" width="100px" value="{{$user->file_path}}">
        <input type="file" name="picture" id="picture" >
        <br><label for="name"><strong>Name:</strong></label>
        <input type="text" class="form-control" id ="name" name="name" value="{{$user->name}}">
        </div>
        <div class="form-group">
        <label for="email"><strong>Email:</strong></label>
        <input type="text" class="form-control" id ="email" value="{{$user->email}}" name="email">
        <br><strong>Salary:{{$user->salary}}</strong>
        <br><strong>Role:{{$user->role}}</strong>    
    </div>
        <button class="btn btn-primary" type="submit">Update Profile</button>
        </form>
</div>
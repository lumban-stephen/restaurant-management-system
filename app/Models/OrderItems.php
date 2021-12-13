<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
    use HasFactory;
    protected $table = 'order_items';
    protected $fillable = [
        'order_id',
        'dish_id'
    ];

    public function order() {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    } //This function allows us to call the metadata of this foreign key in the react components
    
    public function dish() {
        return $this->belongsTo(Dish::class, 'dish_id', 'id');
    } //This function allows us to call the metadata of this foreign key in the react components
}

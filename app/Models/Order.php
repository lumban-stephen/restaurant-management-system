<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'order_detail_id',
        'user_id',
    ];

    public function orderDetails() {
        return $this->belongsTo(OrderDetails::class, 'order_detail_id', 'id');
    } //This function allows us to call the metadata of this foreign key in the react components

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    } //This function allows us to call the metadata of this foreign key in the react components
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pos extends Model
{
    use HasFactory;
    protected $table = 'pos';
    protected $fillable = [
        'order_id',
    ];

    protected $orderFunc = ['order'];
    public function order() {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    } //This function allows us to call the metadata of this foreign key in the react components
      //For reference, look up OrderRecord.js
    
}

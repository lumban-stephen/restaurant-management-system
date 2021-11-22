<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::create('inventory', function (Blueprint $table) {
            $table->id('inventory_id');
            $table->string('food_name');
            $table->enum('unit', array('ml', 'g'));
            $table->integer('quantity');
            $table->float('portion_size');
            $table->date('restocked_date');
            $table->date('expiry_date');
            $table->unsignedBigInteger('dish_id');
            $table->foreign('dish_id')->references('dish_id')->on('dish')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inventory');
        $table->dropForeign('inventory_dish_id_foreign');
    }
}

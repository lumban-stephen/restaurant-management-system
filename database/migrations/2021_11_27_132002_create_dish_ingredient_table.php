<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDishIngredientTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dish_ingredient', function (Blueprint $table) {
            $table->id('dish_ingredient_id');
            $table->float('portion_size')->nullable();

            $table->unsignedBigInteger('ingredient_id')->nullable();
            $table->foreign('ingredient_id')->references('ingredient_id')->on('ingredient');

            $table->unsignedBigInteger('dish_id')->nullable();
            $table->foreign('dish_id')->references('dish_id')->on('dish');
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
        Schema::dropIfExists('dish_ingredient');
        $table->dropForeign('dish_ingredient_dish_id_foreign');
        $table->dropForeign('dish_ingredient_inventory_id_foreign');
    }
}

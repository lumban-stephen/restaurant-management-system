<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDishIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dish_ingredients', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('dish_id')->nullable();
            $table->foreign('dish_id')->references('id')->on('dishes');
            $table->unsignedBigInteger('ingredient_id')->nullable();
            $table->foreign('ingredient_id')->references('id')->on('inventories');

            $table->timestamps();

        });

        //DB::statement('ALTER TABLE `dish_ingredients` ADD CONSTRAINT `dish_ingredients_dish_id_foreign` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dish_ingredients');
        $table->dropForeign('dish_ingredients_dish_id_foreign');
        $table->dropForeign('dish_ingredients_ingredient_id_foreign');
    }
}

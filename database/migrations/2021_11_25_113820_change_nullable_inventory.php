<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeNullableInventory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('inventory', function(Blueprint $table){
            //$table->dropForeign('inventory_dish_id_foreign');
            //$table->dropIndex('inventory_dish_id_foreign');
            //$table->dropColumn('dish_id');
            //$table->dropColumn('food_name');
            //$table->unsignedBigInteger('ingredient_id')->nullable();
            //$table->foreign('ingredient_id')->references('ingredient_id')->on('ingredient');
        });

        //DB::statement("ALTER TABLE inventory MODIFY unit ENUM('ml', 'g','pcs')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        
        //$table->unsignedBigInteger('dish_id');
        //$table->foreign('dish_id')->references('dish_id')->on('dish')->onDelete('cascade');
        //$table->string('food_name');
        //$table->dropForeign('inventory_ingredient_id_foreign');
        //DB::statement("ALTER TABLE inventory MODIFY unit ENUM('ml', 'g')");
    }
}

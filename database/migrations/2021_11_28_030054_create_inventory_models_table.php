<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class CreateInventoryModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        
        Schema::create('inventory_models', function (Blueprint $table) {
            $dt = new Carbon();
            $table->id();
            $table->string("Ingredient");
            $table->int("Quantity");
            $table->enum('Unit',['pcs', 'liter', 'ml', 'grams', 'pack']);
            $table->date("Restocked")->$dt;
            $table->date("Expiry")->default($table->$dt->addDays(7));
            $table->enum('Status', ['Good', 'Near Expiry', 'Expired']);
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
        Schema::dropIfExists('inventory_models');
    }
}

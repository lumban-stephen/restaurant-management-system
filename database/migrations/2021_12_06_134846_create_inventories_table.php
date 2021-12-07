<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventories', function (Blueprint $table) {
            $dt = new Carbon();
            $table->id();
            $table->string('food_name');
            $table->integer('quantity');
            $table->enum('unit', ['grams', 'kg', 'pcs', 'l']);
            $table->dateTime('restocked_date', 3)->default($dt);
            $table->dateTime('expiry_date', 3)->default($dt->addDays(7));
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
        Schema::dropIfExists('inventories');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id('order_id');
            $table->enum('status', array('pending', 'confirmed','delivered'))->default('pending')->nullable();
            $table->date('order_date')->nullable();
            $table->string('receiver')->nullable();
            $table->string('location')->nullable();
            $table->string('note')->nullable();
            $table->integer('total_bill')->nullable();

            $table->unsignedBigInteger('bill_id')->nullable();
            $table->foreign('bill_id')->references('bill_id')->on('bill');

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
        Schema::dropIfExists('orders');
        $table->dropForeign('order_bill_id_foreign');
    }
}

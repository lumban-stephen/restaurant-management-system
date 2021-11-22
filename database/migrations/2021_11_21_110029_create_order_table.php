<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order', function (Blueprint $table) {
            $table->id('order_id');
            $table->enum('status', array('pending', 'confirmed','delivered'))->default('pending');

            $table->unsignedBigInteger('order_detail_id');
            $table->foreign('order_detail_id')->references('order_detail_id')->on('order_detail')->onDelete('cascade');
            
            $table->unsignedBigInteger('delivery_id');
            $table->foreign('delivery_id')->references('delivery_id')->on('delivery')->onDelete('cascade');

            $table->unsignedBigInteger('bill_id');
            $table->foreign('bill_id')->references('bill_id')->on('bill')->onDelete('cascade');
            
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');

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
        Schema::dropIfExists('order');
        $table->dropForeign('order_order_detail_id_foreign');
        $table->dropForeign('order_delivery_id_foreign');
        $table->dropForeign('order_bill_id_foreign');
        $table->dropForeign('order_user_id_foreign');
    }
}

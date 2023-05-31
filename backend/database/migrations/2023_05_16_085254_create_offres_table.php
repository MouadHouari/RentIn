<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offres', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('agence_id');
            $table->unsignedBigInteger('voiture_id');
            $table->string('ville');
            $table->unsignedSmallInteger('prix');
            $table->text('description');
            $table->string('etat');
            $table->timestamps();
            $table->foreign('voiture_id')
                  ->references('id')  
                  ->on('voitures')
                  ->onUpdate('cascade')
                  ->onDelete('cascade');  
            $table->foreign('agence_id')
                  ->references('id')  
                  ->on('users')
                  ->onUpdate('cascade')
                  ->onDelete('cascade');  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('offres');
    }
};

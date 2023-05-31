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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('offre_id');
            $table->unsignedBigInteger('voiture_id');
            $table->unsignedBigInteger('agence_id');
            $table->unsignedBigInteger('client_id');
            $table->string('nom');
            $table->string('prenom');
            $table->string('email');
            $table->unsignedInteger('tel');
            $table->unsignedTinyInteger('personnes');
            $table->unsignedTinyInteger('bagages');
            $table->date('dateDebut');
            $table->date('dateRetour');
            $table->text('message');
            $table->unsignedSmallInteger('totale');
            $table->string('etat');
            $table->timestamps();
            $table->foreign('offre_id')
                  ->references('id')  
                  ->on('offres')
                  ->onUpdate('cascade')
                  ->onDelete('cascade');  
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
            $table->foreign('client_id')
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
        Schema::dropIfExists('reservations');
    }
};

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Tour extends Model
{
    protected $table = 'tour'; // Nombre de la tabla en la base de datos
    use HasFactory;
}

<?php

namespace App\Http\Controllers\API;

use App\Models\Image;
use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::all();
        return response()->json([
            'status' => 200,
            'restaurants' => $restaurants,
        ]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'address'=>'required|max:191',
            'phone'=>'required|max:191',
            'description'=>'required|max:600',
            'image'=>'required',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'validate_err'=>$validator->errors(),
            ]);
        }
        else 
        {
            $restaurant = new Restaurant;
            $restaurant->name = $request->input('name');
            $restaurant->address = $request->input('address');
            $restaurant->phone = $request->input('phone');
            $restaurant->description = $request->input('description');

            $image = $request->file('image');
            $fileName = time(). '.' .$image->getClientOriginalExtension();
            $restaurant->image = $fileName;
            $image->move('uploads/', $fileName);
    
            $restaurant->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'Restaurant Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $restaurant = Restaurant::find($id);
        if($restaurant)
        {
            return response()->json([
                'status'=>200,
                'restaurant'=>$restaurant,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Restaurant ID Found',
            ]);
        }
    }
    
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'address'=>'required|max:191',
            'phone'=>'required|max:191',
            'description'=>'required|max:600',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'validate_err'=>$validator->errors(),
            ]);
        }
        else 
        {
            $restaurant = Restaurant::find($id);
            
            if($restaurant)
            {
                $restaurant->name = $request->input('name');
                $restaurant->address = $request->input('address');
                $restaurant->phone = $request->input('phone');
                $restaurant->description = $request->input('description');
                if($request->hasFile('image'))
                {
                    $image = $request->file('image');
                    $fileName = time(). '.' .$image->getClientOriginalExtension();
                    $restaurant->image = $fileName;
                    $image->move('uploads/', $fileName);
                    unlink('uploads/' . $request->input('oldImgSrc'));
                }

                $restaurant->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Restaurant Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'No Restaurant ID Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $restaurant = Restaurant::find($id);
        $restaurant->delete();
        unlink('uploads/' . $restaurant->image);
        return response()->json([
            'status'=>200,
            'message'=>'Student Deleted Successfully',
        ]);
    }
}

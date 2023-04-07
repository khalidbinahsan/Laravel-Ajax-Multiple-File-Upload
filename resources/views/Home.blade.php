@extends('Layout.app')
@section('title', 'Laravel axios multiple file uploader')
@section('content')
    <dev class="container-fluid">
        <div class="row">
            <div class="card">
                <div class="card-header">
                    <H4>Laravel axios multiple file uploader</H4>
                </div>
                <div class="card-body">
                    <button class="btn btn-primary btn-md mb-3 add-file">Add File</button>
                    <table class="table table-striped">
                       <thead>
                        <tr>
                            <th>File</th>
                            <th>File Size</th>
                            <th>Upload</th>
                            <th>Cancel</th>
                            <th>Uploaded (MB)</th>
                            <th>Uploaded (%)</th>
                            <th>Status</th>
                        </tr>
                       </thead>
                        <tbody class="file-list">
                        {{--  Table row will appear here by add-file button click --}}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </dev>
@endsection

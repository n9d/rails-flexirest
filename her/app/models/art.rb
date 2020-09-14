class Art < Flexirest::Base
  base_url "http://192.168.0.10:3001"

  get :all, "/arts"
  get :find, "/arts/:id"
  put :save, "/arts/:id"
  post :create, "/arts"
  delete :remove, "/arts/:id"

  def to_h
    JSON.parse(self.to_json)
  end
end

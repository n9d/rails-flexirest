require 'test_helper'

class ArticleFormControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get article_form_index_url
    assert_response :success
  end

end

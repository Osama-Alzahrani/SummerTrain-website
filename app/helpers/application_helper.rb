module ApplicationHelper
  include Pagy::Frontend


  def pdf_preview(pdf_attachment)
    pdf_blob = pdf_attachment.blob
    return unless pdf_blob

    tag.object data: rails_blob_path(pdf_blob, disposition: 'inline'), type: 'application/pdf', width: '100%', height: '500px' do
      tag.embed src: rails_blob_path(pdf_blob, disposition: 'inline'), type: 'application/pdf'
    end
  end
  def current_url?(path)
    request.fullpath == path
  end
end

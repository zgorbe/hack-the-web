import { feedbacksRef } from '../firebase';

class FeedbackService {
    addFeedback(email, content) {
        const feedback = {
            email, content, 
            timestamp: new Date().getTime()
        };

        feedbacksRef.push(feedback);
    }

    subscribeForFeedbacks(callback) {
        feedbacksRef.on('value', snapshot => {
            let data = snapshot.val(),
                feedbacks = [];
            
            if (data) {
                for (let id of Object.keys(data)) {
                    data[id].id = id;
                    feedbacks.push(data[id]);
                }
                
                feedbacks.sort(function(a, b) {
                    return b.timestamp - a.timestamp;
                });
            }

            callback(feedbacks);
        });
    }

    unsubscribeForFeedbacks() {
        feedbacksRef.off();
    }
}

const feedbackService = new FeedbackService();
export default feedbackService;